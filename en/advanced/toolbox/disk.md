# Disk

The disk page provides disk partition management, LVM logical volume management, SMART disk health, and RAID array status features.

## Disk Management

![Disk Management](/images/toolbox/toolbox-disk.png)

### Disk Information

The top of the page displays basic information for each disk:

- **Disk Name**: Such as vda, sda
- **Disk Type**: SSD, or the disk model in uppercase
- **Size**: Total disk capacity
- **Partitions**: Number of partitions

The disk that holds the root (`/`) partition is marked with a **System Disk** tag and cannot be initialized or have its partitions unmounted.

### Partition List

Each disk shows its partition information:

| Column         | Description                               |
|----------------|-------------------------------------------|
| Partition Name | Partition device name, such as vda1, vda2 |
| Size           | Partition capacity                        |
| Used           | Used space                                |
| Available      | Available space                           |
| Usage          | Usage percentage                          |
| Mount Point    | Mount directory, such as `/`, `/data`     |
| File System    | File system type, such as ext4, xfs       |
| Actions        | Unmount and other operations              |

### Mount Partition

Mount an unmounted partition to a specified directory:

- **Partition**: Select the partition to mount
- **Mount Path**: Mount directory, such as `/mnt/data`
- **Mount Options**: Mount parameters, such as `defaults,noatime`
- **Auto Mount on Boot**: Whether to write to fstab for automatic mounting on boot

### Format Partition

::: danger Warning
Formatting will erase all data on the partition!
:::

- **Partition**: Select the partition to format
- **File System Type**: ext4, ext3, xfs, or btrfs

### Initialize Disk

::: danger Warning
Initialization will delete all partitions and data on the disk!
:::

Initialize the entire disk as a single partition:

- **Disk**: Select the disk to initialize
- **File System Type**: ext4, ext3, xfs, or btrfs

### Auto Mount Configuration (fstab)

Display mount configurations in `/etc/fstab`:

- **Device**: Device name or UUID
- **Mount Point**: Mount directory
- **File System**: File system type
- **Options**: Mount options
- **Actions**: Remove configuration

## LVM Management

![LVM Management](/images/toolbox/toolbox-disk-lvm.png)

LVM (Logical Volume Manager) provides flexible disk space management with support for dynamic partition resizing.

### Physical Volume (PV)

Physical volumes are the foundation of LVM, typically a disk partition or an entire disk.

**Create Physical Volume**:

1. Select device (unused partition or disk)
2. Click **Create Physical Volume**

### Volume Group (VG)

A volume group consists of one or more physical volumes, representing a storage pool concept.

**Create Volume Group**:

1. Enter volume group name
2. Select physical volumes to add
3. Click **Create Volume Group**

### Logical Volume (LV)

Logical volumes allocate space from volume groups, equivalent to traditional partitions.

**Create Logical Volume**:

1. Enter logical volume name
2. Select volume group
3. Set size (GB)
4. Click **Create Logical Volume**

### Extend Logical Volume

Dynamically extend the size of a logical volume:

1. Select the logical volume to extend
2. Enter extension size (GB)
3. Check **Auto Resize File System** (recommended)
4. Click **Extend Logical Volume**

::: tip Tip
The advantage of LVM is that logical volumes can be extended online without unmounting partitions or restarting the system.
:::

## SMART

The SMART tab shows the health information of disks that support S.M.A.R.T.

::: tip Tip
SMART relies on `smartctl`. If it is not installed, the tab will prompt you to install smartmontools first (e.g. `apt install smartmontools` or `dnf install smartmontools`).
:::

Select a disk to view its details across two tabs:

- **Basic Info**: Current temperature, health status (PASSED / FAILED), and device details such as model, serial number, firmware, capacity, interface, rotation rate, and power-on hours.
- **SMART Attributes**: The full attribute table. For ATA/SATA disks it lists ID, attribute, value, worst, threshold, raw value, and status; for NVMe disks it lists the health information log (such as percentage used, available spare, data units read/written, and media errors).

## RAID

The RAID tab automatically detects and displays the status of RAID arrays. The following controller types are supported:

- **Linux Software RAID (mdadm)**
- **MegaRAID (LSI/Broadcom)** via `storcli`
- **HP Smart Array** via `ssacli`
- **Adaptec** via `arcconf`

For each array it shows the RAID level, size, strip size, state, the active/total device count, and rebuild progress (when rebuilding), along with the list of physical disks. For hardware controllers, the controller model, serial number, firmware, and cache size are also displayed.

::: tip Tip
Detecting hardware RAID requires the corresponding vendor CLI tool to be installed. If no RAID configuration is detected, the tab will indicate so.
:::
