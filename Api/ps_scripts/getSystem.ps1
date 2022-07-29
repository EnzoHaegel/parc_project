Get-CimInstance -ClassName Win32_BIOS
Get-CimInstance -ClassName Win32_Processor | Select-Object -ExcludeProperty "CIM*"
Get-CimInstance -ClassName Win32_ComputerSystem
Get-CimInstance -ClassName Win32_OperatingSystem |
Select-Object -Property BuildNumber,BuildType,OSType,ServicePackMajorVersion,ServicePackMinorVersion
Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DriveType=3"
Get-CimInstance -ClassName Win32_LocalTime