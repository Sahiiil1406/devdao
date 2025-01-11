

const envToCmd = {
    "node:18-alpine": ["node", "main.js"],
    "python": ["python", "main.py"],
    "python:3.10-alpine": ["python3", "main.py"],
    "python:2.7-alpine": ["python2", "main.py"],
    "java:17-alpine": ["java", "-cp", ".", "Main"],
    "java:8-alpine": ["java", "-cp", ".", "Main"],
    "golang:1.20-alpine": ["go", "run", "main.go"],
    "golang:1.18-alpine": ["go", "run", "main.go"],
    "ruby:3.2-alpine": ["ruby", "main.rb"],
    "ruby:2.7-alpine": ["ruby", "main.rb"],
    "php:8.2-alpine": ["php", "main.php"],
    "php:7.4-alpine": ["php", "main.php"],
    "rust:1.70-alpine": ["cargo", "run", "--bin", "main"],
    "rust:1.60-alpine": ["cargo", "run", "--bin", "main"],
    "csharp:6.0-alpine": ["dotnet", "run", "--project", "Main.csproj"],
    "csharp:7.0-alpine": ["dotnet", "run", "--project", "Main.csproj"],
    "perl:5.36-alpine": ["perl", "main.pl"],
    "perl:5.30-alpine": ["perl", "main.pl"],
    "deno:1.36-alpine": ["deno", "run", "main.ts"],
    "bash:5.1-alpine": ["bash", "main.sh"],
    "typescript:4.9-alpine": ["ts-node", "main.ts"],
    "typescript:5.0-alpine": ["ts-node", "main.ts"],
    "swift:5.9-alpine": ["swift", "main.swift"],
    "swift:5.7-alpine": ["swift", "main.swift"],
    "kotlin:1.9-alpine": ["kotlin", "MainKt"],
    "kotlin:1.8-alpine": ["kotlin", "MainKt"],
    "scala:3.3-alpine": ["scala", "Main"],
    "scala:2.13-alpine": ["scala", "Main"],
    "haskell:9.2-alpine": ["runhaskell", "main.hs"],
    "haskell:8.10-alpine": ["runhaskell", "main.hs"],
    "r:4.3-alpine": ["Rscript", "main.R"],
    "r:4.1-alpine": ["Rscript", "main.R"],
};


const runner=async(req,res)=>{
    try {
        const {image_name,id,payload}=req.body;
          //use s3 to get the code and store it folder code/id(currently code is in folder)

          // Create the container
          const hostPath = path.resolve(`/root/projects/Funcify/code/${id}`);
          const container = await docker.createContainer({
            Image: image_name, // The Docker image
            Cmd: envToCmd.image_name, // Command to execute eg. ["node", "index.js"]
            Env: [`PAYLOAD=${JSON.stringify(payload)}`], // Pass the payload as an environment variable
            HostConfig: {
                Binds: [`${hostPath}:/usr/src/app`], // Mount the host directory to the container
                AutoRemove: true
            },
            WorkingDir: "/usr/src/app"
        });

        // Start the container
        await container.start();
        const logStream = await container.logs({
            stdout: true,
            stderr: true,
            follow: true
        });

        // Gather log output
        let logOutput = '';
        logStream.on('data', (chunk) => {
            logOutput += chunk.toString('utf-8');
        });

        // Listen for the end of logs
        logStream.on('end', () => {
            console.log(`Container Output:\n${logOutput.trim()}`);
            res.send(logOutput.trim())
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports=runner