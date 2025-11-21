#!/bin/bash

# Set install mode to online since boot.sh is used for curl installations
export LATIARCH_ONLINE_INSTALL=true

ansi_art='                 ▄▄▄                                                   
 ▄█          ▄████████     ███      ▄█     ▄████████    ▄████████  ▄████████    ▄█    █▄    
███         ███    ███ ▀█████████▄ ███    ███    ███   ███    ███ ███    ███   ███    ███   
███         ███    ███    ▀███▀▀██ ███▌   ███    ███   ███    ███ ███    █▀    ███    ███   
███         ███    ███     ███   ▀ ███▌   ███    ███  ▄███▄▄▄▄██▀ ███         ▄███▄▄▄▄███▄▄ 
███       ▀███████████     ███     ███▌ ▀███████████ ▀▀███▀▀▀▀▀   ███        ▀▀███▀▀▀▀███▀  
███         ███    ███     ███     ███    ███    ███ ▀███████████ ███    █▄    ███    ███   
███▌    ▄   ███    ███     ███     ███    ███    ███   ███    ███ ███    ███   ███    ███   
█████▄▄██   ███    █▀     ▄████▀   █▀     ███    █▀    ███    ███ ████████▀    ███    █▀    
▀                                                      ███    ███                           '

clear
echo -e "\n$ansi_art\n"

sudo pacman -Syu --noconfirm --needed git

# Default to ryanburkii/latiarch
LATIARCH_REPO="${LATIARCH_REPO:-ryanburkii/latiarch}"

echo -e "\nCloning LatiArch from: https://github.com/${LATIARCH_REPO}.git"
rm -rf ~/.local/share/latiarch/
git clone "https://github.com/${LATIARCH_REPO}.git" ~/.local/share/latiarch >/dev/null

# Use custom branch if instructed, otherwise default to main
LATIARCH_REF="${LATIARCH_REF:-main}"
if [[ $LATIARCH_REF != "main" ]]; then
  echo -e "\e[32mUsing branch: $LATIARCH_REF\e[0m"
  cd ~/.local/share/latiarch
  git fetch origin "${LATIARCH_REF}" && git checkout "${LATIARCH_REF}"
  cd -
fi

echo -e "\nInstallation starting..."
source ~/.local/share/latiarch/install.sh
