import { Injectable } from '@angular/core';
import { ICPU, IDisks, IMachine, IMachines, INetwork, ISystem } from '../models/IMachines';
import { ILogs, IScript, IScriptList } from '../models/IScripts';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  public static MapLogs(data: any): ILogs[] {
    // data is an array of lines, transform it to an array of logs
    const logs: ILogs[] = [];

    // remove the last element if empty to avoid errors
    if (data[data.length - 1] === "") {
      data.pop();
    }

    data.forEach((line: string) => {
      const parts = line.split(' - ');

      const username = parts[1].split(':')[1];
      const script = parts[2].split(':')[1];
      logs.push({
        username,
        script,
        date: parts[0],
      });
    });
    return logs;
  }

  public static MapScript(data: any): IScript {
    return {
      message: data.message,
      stdout: data.stdout,
      stderr: data.stderr,
      return_code: data.return_code,
    };
  }

  public static MapScriptList(data: any): IScriptList {
    return {
      scripts: data.scripts,
    };
  }

  public static MapUserList(data: any): IUser[] {
    return data.map((user: any) => {
      return {
        username: user.username,
        email: user.email,
        role: user.role_id === 1 ? 'admin' : 'user',
      };
    });
  }

  public static MapNetwork(data: any): INetwork {
    return {
      id: data.id,
      ipv4: data.ipv4,
      ipv6: data.ipv6,
      mac: data.mac,
    };
  }

  public static MapSystem(data: any): ISystem {
    return {
      id: data.id,
      os: data.os,
      arch: data.arch,
      name: data.name,
      disk: data.disk,
      model: data.model,
      bios: data.bios,
      uptime: data.uptime,
    };
  }

  public static MapDisks(data: any): IDisks {
    return {
      id: data.id,
      name: data.name,
      size: data.size,
      free: data.free,
      type: data.type,
      temp: data.temp,
      label: data.label,
      serial: data.serial,
      fs: data.fs,
    };
  }

  public static MapCPU(data: any): ICPU {
    return {
      id: data.id,
      name: data.name,
      speed: data.speed,
      cores: data.cores,
      cache: data.cache,
      model: data.model,
      family: data.family,
      stepping: data.stepping,
      vendor: data.vendor,
      flags: data.flags,
    };
  }

  public static MapMachines(data: any): IMachines {
    return {
      id: data.id,
      network: data.network,
      system: data.system,
      disks: data.disks,
      cpu: data.cpu,
    };
  }

  public static MapMachinesArray(data: any): IMachine[] {
    return data.map((machine: IMachine) => this.MapMachine(machine));
  }

  public static MapMachine(data: any): IMachine {
    console.log(data)
    return {
      id: data.id,
      network: MapperService.MapNetwork(data.network),
      system: MapperService.MapSystem(data.system),
      disks: MapperService.MapDisks(data.disks),
      cpu: MapperService.MapCPU(data.cpu),
    };
  }
}
