@echo off
cd mpBuild/common
esptool.exe --port %2 --baud %1 erase_flash && esptool.exe --port %2 --baud %1 write_flash 0x1000 ../ESP32_MixGo/esp32.bin 0x200000 ../ESP32_MixGo/Noto_Sans_CJK_SC_Light16.bin