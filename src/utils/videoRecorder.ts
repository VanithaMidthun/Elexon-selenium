import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import fs from "fs";
import path from "path";
 
export class VideoRecorder {
    private ffmpeg!: ChildProcessWithoutNullStreams;
    private outputPath!: string;
 
    start(testName: string, browser: string) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `${browser}_${testName}_${timestamp}.mp4`;
 
        this.outputPath = path.join(process.cwd(), "videos", fileName);
 
        if (!fs.existsSync("videos")) fs.mkdirSync("videos");
 
        this.ffmpeg = spawn("ffmpeg", [
            "-y",
            "-f", "gdigrab",
            "-framerate", "15",
            "-i", "desktop",
            "-preset", "ultrafast",
            "-r", "15",
            this.outputPath
        ]);
    }
 
    stop() {
        return new Promise<void>((resolve) => {
            if (!this.ffmpeg) return resolve();
            this.ffmpeg.stdin.write("q");
            this.ffmpeg.on("close", () => resolve());
        });
    }
 
    getVideoPath() {
        return this.outputPath;
    }
}