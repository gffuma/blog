---
title: Hello World, From a Lazy Boy
subtitle: I am a programmer but i am also a very lazy boy
slug: hello-world-from-lazy-boy
date: 2022-07-15
---

Hi everyone, this is my first blog post!

I'm Giovanni aka [gffuma](https://github.com/gffuma), I come from Italy and yes, of course I am a programmer.
I love being a programmer.

I'm also a **very** **very** lazy boy, but for me being lazy, as a programmer,
is a skill rather then a fault.

> "I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it."
>
> *Bill Gates (maybe)*


I'm a big fan of [hacker scripts](https://www.jitbit.com/alexblog/249-now-thats-what-i-call-a-hacker/),
In this blog post I'll show you a little *hacker* trick I'm very proud of.

---

Some time ago I was asked to keep track of which days I worked from home and which
days I worked in the office.

This could seem a simple task, but, remember, I'm a very lazy boy... and I'm also an **h4ck3r** 🏴‍☠️.

So i came up with this solution.
When i work from home and when from office?

*...*

Simple! it's enough to check the wi-fi SSID!

Ok so i built a super simple script in `Node.js`.

How to grab the wi-fi SSID is Node:

*(Snippet from my actual script ... this is an old script so is written in CommonJS but i am a very big fun of ESM in node anyway)*

*Aww yes this script was written only for me so run in Mac OSX only lol*

```js
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const CURRENT_WIFI_COMMAND =
  '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I'

async function grabCurrentWifiSSID() {
  const { stdout: rawWifiStauts } = await exec(CURRENT_WIFI_COMMAND)
  const wifiStatus = rawWifiStauts
    .trim()
    .split('\n')
    .reduce((allStatus, line) => {
      const [key, value] = line.split(':').map((piece) => piece.trim())
      allStatus[key] = value
      return allStatus
    }, {})

  if (wifiStatus.AirPort === 'Off') {
    throw new Error('Not connected')
  }
  return wifiStatus.SSID
}
```

The rest of script is trivial if `grabCurrentWifiSSID()` don't fail check
if the SSID is from my home or from my office and write the information
in a JSON with the related date.

To make all automatic i put the script execution in a cron job in my machine
that run every working day, every hour from 10 to 18.

```sh
0 10-18 * * 1-5 node /path/to/script.js
```

Finally and the end of the month when i have to send report of my office days
vs my home days i simple run another script that take the JSON of information
and tells me which days i worked from home and wich days i worked from home ...
the script is also able to dectect potential days off 😉

I sweart you like this little trick n story!
That's all for this first post ... see ya!
