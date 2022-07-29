export interface IScript {
    message: string;
    stdout: string;
    stderr: string;
    return_code: number;
}

export interface IScriptList {
    scripts: string[];
}

export interface ILogs {
    username: string;
    script: string;
    date: string;
}
