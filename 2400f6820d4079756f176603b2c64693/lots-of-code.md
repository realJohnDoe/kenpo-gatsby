# Multiple GitHub SSH Keys

This site has many code frames:

## Generate new SSH Key

```sh
cd ~/.ssh
ssh-keygen -t ed25519 -C "your@email.address"
```

Please choose a describing name!

## Add key to repo

Go to github repo under settings -> Deploy Keys -> Add deploy key and add the content of the generated public key (.pub file extension).

Write rights are mostly enough.

## Edit SSH config

```sh
nano ~/.ssh/config
```

Add your entry like the second one:

```sh
# Default github key for main Repo
Host github.com
   HostName github.com
   IdentityFile ~/.ssh/id_ed25519
   IdentitiesOnly yes

# Other github key for other repo
Host github-other-repo
   HostName github.com
   IdentityFile ~/.ssh/other-repo-key
   IdentitiesOnly yes
```

## Clone Repo

Go to the desired location and clone with ssh and replace the host with the created one:

```sh
git clone git@github-other-repo:user/other-repo.git
```

Or add origin:

```sh
git remote add origin git@github-other-repo:user/other-repo.git
```

## Set username

```sh
git config user.name "My cool server repo"
```
