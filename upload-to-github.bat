@echo off
echo Setting up Git repository...

REM Initialize git repository
git init

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: Portfolio website with React and Vite"

echo.
echo Repository initialized successfully!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Copy the repository URL
echo 3. Run: git remote add origin [YOUR_GITHUB_REPO_URL]
echo 4. Run: git branch -M main
echo 5. Run: git push -u origin main
echo.
echo Example:
echo git remote add origin https://github.com/yourusername/portfolio-website.git
echo git branch -M main
echo git push -u origin main
echo.
pause