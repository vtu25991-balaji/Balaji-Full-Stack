# Git Operations & Branching Strategies

## Task 19: Core Git Operations
```bash
# Initialize repository
git init my-project
cd my-project

# Staging files
echo "# Project Title" > README.md
git add README.md
git add .

# Committing changes
git commit -m "Initial commit with README"

# Pushing to remote (assuming connection)
git remote add origin https://github.com/user/repo.git
git push origin main
```

## Task 20: Branching Strategies & Conflicts
```bash
# Create feature branch
git checkout -b feature-a

# Make changes and commit
echo "Feature A data" >> feature.txt
git add feature.txt
git commit -m "Added Feature A"

# Rebasing vs Merging
git checkout main
# simulate pulling updates from team
echo "Main branch data" >> main.txt
git add . && git commit -m "Updates on main"

# Rebasing feature onto main
git checkout feature-a
git rebase main

# Handling merge conflicts intentionally
git checkout -b feature-conflict
echo "Conflict 1" > file.txt
git commit -am "C1"
git checkout main
echo "Conflict 2" > file.txt
git commit -am "C2"
git merge feature-conflict
# The conflict must be resolved manually before:
# git commit -m "Resolved conflict"
```