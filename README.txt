CVC OFFLINE VERSION 8

LOGIN AND USER ACCOUNTS
First login on a device:  Username: admin   Password: admin123
Login goes straight in. Change the password yourself from "Change password" in the top bar.

Admin: click "Manage users" (top bar) to
- add users (role CVC or Admin) with a starting password
- reset a user's password
- change a user's role, or delete a user
- Export users / Import users, to copy the same accounts to other devices

Forgot the password? On the login screen click "Forgot password?" and set a new admin password.
For safety, an admin should log in and set a Recovery code (Manage users). Once set, "Forgot password?"
asks for that code. Until a code is set, anyone on that device can reset an admin password.
The recovery code is stored on each device separately.

Everyone: "Change password" and "Logout" are in the top bar.

Accounts are stored on each device (offline, no server). Create them on one device,
then use Export users -> Import users to set up the other devices.
Passwords are stored as salted hashes. This is a sign-in gate, not strong security:
the child records are inside index.html, so keep the files on authorized devices only.

CUP / CUV TRACKING
Open the "CUP / CUV Tracking" tab. Only RC with a sponsor (status "មានអ្នកទំនុកបំរុង") are listed.
- Top: totals and progress by village (Sponsored RC, CUP done, CUV done, Complete, Pending).
- Click a village to open its checklist, then tick CUP and CUV for each RC. Untick to undo.
  The date and the username that ticked are saved with each tick.
- If CUP or CUV could not be done, press the red X and choose a reason (Khmer list, or "ផ្សេងៗសូមបញ្ជាក់" with a note).
- Admin: "Admin overview" shows activity by CVC user, the reasons table and the list of items that could not be done.
- Instructions are inside the "ជំនួយ" (help) buttons, hidden until clicked.
- Export summary / Export all open in Excel (CSV).
- Ticks are saved on each device. With ONLINE SYNC they also reach the admin computer automatically.
  Without sync: Backup tracking on one device, Import / merge on the other.
- Admin only: Clear all ticks.

ONLINE SYNC (CVC phones -> admin computer, automatic)
Needed once, by the admin. Without it each device keeps its own data.
1. Go to supabase.com, sign in, click "New project" (free plan is enough). Choose a name and a database
   password, pick the nearest region, wait until it is ready.
2. Open the project, click "SQL Editor" > "New query". Open the file supabase-setup.sql from this folder,
   copy ALL of it, paste it, click Run. It should say "Success".
3. Click Project Settings > API (or "API Keys"). Copy the Project URL and the "anon" / "publishable" key.
4. Open sync-config.js in this folder with Notepad and paste them between the quotes:
      url: "https://xxxx.supabase.co",
      key: "eyJ....",
   Save the file.
5. Upload ALL files of this folder to your private host (GitHub), replacing the old ones.
6. On every device (admin computer and each CVC phone): open the app online once, log in.
   The tracking tab shows "បានធ្វើសមកាលកម្ម HH:MM" when sync works.

How it works: every tick / reason is sent to Supabase within a few seconds; every device checks for new data
about every 30 seconds (and when the app is opened or comes back online). With no internet the changes wait
on the phone and are sent later. If two people change the same RC item, the later change wins.
Data stored online: RC ID, CUP/CUV status, reason, note, date and the CVC username. No child names or photos.
Anyone who has your sync-config.js key could read or change this tracking table, so keep the host private.
Existing ticks already on a device are uploaded the first time that device syncs.
"Clear all" is disabled while sync is on.

QUICK START
1. Open index.html directly for normal offline search and PDF printing.
2. For installation as an app, upload this whole folder to a PRIVATE HTTPS host.
3. Open the hosted address in Chrome or Safari and choose Install App / Add to Home Screen.
4. While online, choose one village and click Save visible photos offline. Repeat for each village needed offline.
5. Use Generate PDF. The print layout is A4 landscape with exactly 10 RC cards per page.

UPDATING AN INSTALLED COPY
This version uses a new offline cache (cvc-v8-7). Replace all files on the host, then open the
app once while online so it refreshes. Existing accounts on a device are kept; an older
single "CVC" login is carried over as a CVC user.

PRIVACY
This package contains child records and external photo links. Keep it on authorized devices only. Do not publish it to a public GitHub repository. Use a private or access-controlled hosting location.
