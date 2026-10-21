#!/usr/bin/env python3
"""Publish aggregate counts from an authenticated GitHub repository_dispatch.

Never transmit names, emails, locations or any other private SharePoint fields.
Existing separately-reviewed pilot asset info is retained.
"""
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo
import json
import os
import sys

if len(sys.argv)!=2:
    raise SystemExit('Usage: publish_counts.py <path_to_github_event_json>')
event=json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
if event.get('action')!='coollective_summary':
    raise SystemExit('Refusing unexpected repository dispatch event type')
payload=event.get('client_payload')
if not isinstance(payload,dict):
    raise SystemExit('Missing aggregate count payload')
allowed={'reportsReceived','underReview','validated'}
if set(payload)!=allowed:
    raise SystemExit('Payload must contain ONLY the three public count fields; no personal data')
for key in allowed:
    value=payload[key]
    if not isinstance(value,int) or isinstance(value,bool) or value<0 or value>10000000:
        raise SystemExit(f'Invalid {key}: expected nonnegative integer')
if payload['underReview']+payload['validated']>payload['reportsReceived']:
    raise SystemExit('Published statuses cannot exceed total received')

file=Path('coollective-public-summary.json')
summary=json.loads(file.read_text(encoding='utf-8')) if file.exists() else {}
for key in allowed:
    summary[key]=payload[key]
summary['published']=True
summary['updatedAt']=datetime.now(timezone.utc).astimezone(ZoneInfo('Asia/Manila')).strftime('%Y-%m-%d %I:%M %p PHT')
# NEVER overwrite actionsRecorded or verified assets based on an unverified reporting trigger.
summary.setdefault('actionsRecorded',None)
file.write_text(json.dumps(summary,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print('Published counts (no private data):', {k:summary[k] for k in sorted(allowed)})
