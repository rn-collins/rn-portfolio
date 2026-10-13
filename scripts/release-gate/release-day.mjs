#!/usr/bin/env node
// Is today (Pacific/Honolulu) a release day in data/releases.json? Used by .github/workflows/daily-release.yml.
// Prints the builds that go live today. In GitHub Actions it also writes release=true|false, date and ids to
// GITHUB_OUTPUT. Pass a date (YYYY-MM-DD) to check another day.
import fs from 'node:fs';
import {isIsoDate,loadReleases,todayInHawaii} from './rules.mjs';

const today=isIsoDate(process.argv[2])?process.argv[2]:todayInHawaii();
const due=loadReleases().filter(r=>r.hold===false&&r.releasedAt===today).map(r=>r.id);
console.log(due.length?`${today}: ${due.length} release(s) today: ${due.join(', ')}`:`${today}: nothing is released today`);
if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,`release=${due.length?'true':'false'}\ndate=${today}\nids=${due.join(' ')}\n`);
