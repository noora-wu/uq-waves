# UQ Waves MVP - Installation Guide

A quick guide to build and install the UQ Waves campus community app on your local machine.

---

## 📋 Prerequisites

Before you start, make sure you have:

### Required Software
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Check Your Installation
Open your terminal/command prompt and run:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

---

## 💻 Installation Steps

### ⚡ Quick Start Guides by Platform

#### 🍎 Mac Users

1. Open **Terminal** (press `Cmd + Space`, type "Terminal", press Enter)
2. Navigate to the project folder
3. Install dependencies: `npm install` (press Enter)
4. Start server: `npm run dev` (press Enter)
5. Open browser to the address shown in Terminal

#### 🪟 Windows Users

1. Open **Command Prompt** or **PowerShell** (press `Win + R`, type "cmd", press Enter)
2. Navigate to project: `cd C:\path\to\Code`
3. Install dependencies: `npm install` (press Enter)
4. Start server: `npm run dev` (press Enter)
5. Open browser to the address shown

**Or use the quick method:** Just double-click `start.bat` file in the Code folder!

#### 🐧 Linux Users

1. Open **Terminal** (usually `Ctrl + Alt + T`)
2. Navigate to project: `cd /path/to/Code`
3. Install dependencies: `npm install`
4. Start server: `npm run dev`
5. Open browser to the address shown in Terminal

---

**⚠️ Important for ALL users:** 
When you see commands like:
```
npm install
```
You only type `npm install` - **don't type "bash" or "cmd"!** Those are just formatting markers.

---

### Step 1: Get the Code

**Option A: Clone from Git**
```bash
git clone https://github.com/COMP1100-7110-2025-s2/Mon_11am_Team_17.git
cd Code
```

**Option B: Download ZIP**
- Download the project ZIP file
- Extract it to a folder
- Open terminal/command prompt in that folder

### Step 2: Install Dependencies

**All Platforms - Run this command:**

```
npm install
```

**How to run this command:**
- **Mac:** Open Terminal, navigate to project folder, type `npm install` and press Enter
- **Windows:** Open Command Prompt or PowerShell, navigate to project folder, type `npm install` and press Enter
- **Windows Quick Method:** Simply double-click the `start.bat` file in the Code folder

**Note:** Don't type "bash" or "cmd" - those are just formatting markers in the documentation!

This will take 1-2 minutes to download all required packages.

### Step 3: Start the Development Server

**All Platforms - Run this command:**

```
npm run dev
```

**How to run this command:**
- **Mac:** In Terminal, type `npm run dev` and press Enter
- **Windows:** In Command Prompt or PowerShell, type `npm run dev` and press Enter
- **Windows Quick Method:** The `start.bat` file automatically runs this command

**Remember:** Don't type "bash" - just type the command directly!

### Step 4: Access the Application

After starting the server, **CHECK YOUR TERMINAL** for the actual addresses:

```
VITE v6.3.5  ready in xxx ms
➜  Local:   http://localhost:3002/      ← Use this on your computer
➜  Network: http://10.98.135.41:3002/   ← Use this on your phone
```

**⚠️ IMPORTANT:** 
- **Port number is NOT fixed!** It may be 3000, 3001, 3002, etc.
- **Always check the terminal output** for the actual addresses
- **Copy the exact address** shown in your terminal

**On your computer:**
- Open your web browser
- Go to the **Local** address from your terminal
- Example: `http://localhost:3002/`

**On your mobile device (same WiFi):**
- Connect your phone to the same WiFi as your computer
- Open your phone's browser
- Go to the **Network** address from your terminal
- Example: `http://10.98.135.41:3002/`
- Add to home screen for an app-like experience

---

## 🔧 Platform-Specific Notes

### Windows Users

**Port Selection:**
- The app tries port 3000 first
- If 3000 is busy, it automatically tries 3001, 3002, 3003, etc.
- **Always use the port shown in your terminal output**
- You may see messages like "Port 3000 is in use, trying another one..."

**PowerShell Execution Policy Error:**
If you get an error about scripts being disabled:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Firewall Warning:**
- Windows may ask if you want to allow network access
- Click "Allow" to enable mobile device access

### Mac Users

**Permission Denied Error:**
If you get a permission error, add `sudo` (but try without it first):
```bash
sudo npm install
```

**Firewall Settings:**
- Go to System Settings → Network → Firewall
- Ensure the development server is allowed

**Port Selection:**
- The app automatically finds an available port (3000, 3001, 3002, etc.)
- Check terminal output for the actual port being used

### Linux Users

**npm not found:**
Install Node.js and npm:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

**Permission Issues:**
You may need to fix npm permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## 📱 Mobile Installation

### Install as PWA (Progressive Web App)

**iPhone (Safari):**
1. Open the app in Safari
2. Tap the Share button (📤)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Tap "Install app" or "Add to Home Screen"
4. Tap "Install"

Now you have UQ Waves as a home screen icon!

---

## 🎨 Build for Production

To create a production-ready build:

```bash
npm run build
```

This creates a `dist` folder with optimized files that can be deployed to a web server.

To preview the production build:
```bash
npm run preview
```

---

## 🐛 Troubleshooting

### Problem: "Cannot find module"
**Solution:** Run `npm install` again

### Problem: Port already in use
**Solution:** 
- The app automatically tries the next available port
- Check your terminal output for the actual port being used
- Example: If 3000 is busy, it tries 3001, then 3002, etc.

### Problem: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: Mobile can't connect
**Solution:** 
- Ensure both devices are on the same WiFi
- Check firewall settings
- Use the Network IP address shown in terminal, not localhost

### Problem: Blank screen or errors
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: Changes not showing
**Solution:**
- Vite supports hot reload - changes should appear automatically
- If not, refresh the browser (Ctrl+R or Cmd+R)

---

## 🔍 Verifying Installation

### Example Terminal Output
When the server starts successfully, you'll see something like this:
```
Port 3000 is in use, trying another one...
Port 3001 is in use, trying another one...
VITE v6.3.5  ready in 182 ms
➜  Local:   http://localhost:3002/
➜  Network: http://10.98.135.41:3002/
```
Use **these exact addresses** from your own terminal!

### What You Should See in Browser
Once the app is running, you should see:
1. ✅ Onboarding screen (first time)
2. ✅ Login screen
3. ✅ Three main tabs: Home, Rating, Profile
4. ✅ Ability to browse subjects, teachers, and events
5. ✅ Rating functionality with star system

---

## 📚 Project Structure

```
Code/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── store/            # State management
│   ├── types/            # TypeScript types
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.ts       # Build configuration
└── start.bat           # Windows quick start
```

---

## 💡 Development Tips

### Hot Reload
- Changes to code are automatically reflected
- No need to restart the server

### Ports
- **Default:** Tries 3000 first
- **If busy:** Automatically tries 3001, 3002, 3003, etc.
- **⚠️ ALWAYS check terminal output for the actual port**
- Port number varies depending on what's available on your system

### Multiple Devices
- All devices on same WiFi can access
- Each sees their own session
- Changes apply to all connected devices

### Stopping the Server
- Press `Ctrl+C` in the terminal
- Or close the terminal window

---

## 📞 Need Help?

**Common Issues:**
- Check the Troubleshooting section above
- Make sure all prerequisites are installed
- Try clearing node_modules and reinstalling

**Still stuck?**
- Check the browser console (F12) for errors
- Check the terminal for error messages
- Ensure you're in the correct directory

---

## ✅ Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] Project files downloaded/cloned
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] **Check terminal for Local and Network addresses**
- [ ] Open the Local address in your browser (e.g., http://localhost:3002/)
- [ ] See the UQ Waves app
- [ ] (Optional) Access from mobile using Network address
- [ ] (Optional) Add to home screen

---

**Estimated Time:** 5-10 minutes for first-time setup

**Minimum System Requirements:**
- 2GB RAM
- 500MB free disk space
- Modern web browser (Chrome, Firefox, Safari, Edge)

