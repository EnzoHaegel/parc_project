export interface INetwork {
    id: number;
    ipv4: string;
    ipv6: string;
    mac: string;
}

export interface ISystem {
    id: number;
    os: string;
    arch: string;
    name: string;
    disk: string;
    model: string;
    bios: string;
    uptime: string;
}

export interface IDisks {
    id: number;
    name: string;
    size: string;
    free: string;
    type: string;
    temp: string;
    label: string;
    serial: string;
    fs: string;
}

export interface ICPU {
    id: number;
    name: string;
    speed: string;
    cores: string;
    cache: string;
    model: string;
    family: string;
    stepping: string;
    vendor: string;
    flags: string;
}

export interface IMachines {
    id: number;
    network: number;
    system: number;
    disks: number;
    cpu: number;
}

export interface IMachine {
    id: number;
    network: INetwork;
    system: ISystem;
    disks: IDisks;
    cpu: ICPU;
}
