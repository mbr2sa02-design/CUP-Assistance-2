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
Easiest way: in "RC Search", every RC that has a sponsor shows a green tick area at the bottom of its card.
Tick CUP and CUV when done, or press the red X and choose a reason if it could not be done.
It is saved at once and appears in the tracking tab and in the admin overview. RC without a sponsor have no tick area.
Open the "CUP / CUV Tracking" tab. Only RC with a sponsor (status "មានអ្នកទំនុកបំរុង") are listed.
- Top: totals and progress by village (Sponsored RC, CUP done, CUV done, Complete, Pending).
- Click a village to open its checklist, then tick CUP and CUV for each RC. Untick to undo.
  The date and the username that ticked are saved with each tick.
- If CUP or CUV could not be done, press the red X and choose a reason (Khmer list, or "ផ្សេងៗសូមបញ្ជាក់" with a note).
- Admin: "Admin overview" shows activity by CVC user, the reasons table and the list of items that could not be done.
- Instructions are inside the "ជំនួយ" (help) buttons, hidden until clicked.
- Export summary / Export all open in Excel (CSV).
- Ticks are saved on each device. With ONLINE SYNC + SHARED ACCOUNTS (admin sets everything once)
With this on, the ADMIN creates every username and password once, in the app. Each CVC types that
username and password on their own phone, once, and the phone remembers it until the admin changes
the password, deletes the account, or the CVC presses Logout. No setup on the phones.
Tracking (CUP / CUV ticks and reasons) from all CVC phones appears on the admin computer automatically.

Set up (once, by the admin):
1. Go to supabase.com, open your project (or click "New project").
2. SQL Editor > New query. Open supabase-setup.sql from this folder, copy ALL of it, paste, click Run.
   It should say "Success". (Safe to run again.)
3. SQL Editor > New query. Open supabase-admin-account.sql, replace PUT-YOUR-PASSWORD-HERE with the
   password you want for the admin account, click Run. It should say: OK: user admin saved (admin).
   Do NOT upload that file to GitHub after you typed a real password into it.
4. Click Connect (or Settings > API Keys). Copy the Project URL and the publishable key (sb_publishable_...).
5. Open sync-config.js with Notepad, paste them between the quotes, save.
6. Upload ALL files of this folder to your private host (GitHub), replacing the old ones.
7. Open the app, log in as admin with the password from step 3, click "Manage users" and add each CVC
   (username + password + role CVC). Give each CVC their username and password.

Notes:
- If admin forgets the password: change it in supabase-admin-account.sql and run it again in the SQL Editor.
- If a CVC forgets the password: Manage users > Reset password, then tell them the new one.
- Changing a password or deleting an account logs that person out on every phone.
- 10 wrong passwords in a row lock that account for 10 minutes.
- A phone needs internet for its first login. After that it keeps working offline, and changes are sent later.
- Data stored online: accounts (passwords as bcrypt hashes) and for tracking: RC ID, status, reason, note, date,
  username. No child names or photos. The tables cannot be read or changed directly with the public key;
  every request must come from a logged-in user.
- The key in sync-config.js is a public key by design; keep the site private anyway.
- Without a key in sync-config.js the app still works on one device with its own local accounts.

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
