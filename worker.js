const { start } = require('@nexrender/worker')

const main = async () => {
    const serverHost = 'http://localhost:3000'
    const serverSecret = 'no'
    process.env['NEXRENDER_FFMPEG'] = '/usr/local/bin/ffmpeg'
    await start(serverHost, serverSecret, {
        workpath: '/Users/applebusstop/Documents/Nexrender/.nexrender',
        binary: '/Users/applebusstop/Applications/Adobe After Effects CC 2021/aerender',
        skipCleanup: false,
        addLicense: false,
        debug: true,
        actions: {
            "upload-media-server": (job, settings, {input, params}, type) => {
                // Custom action code
                
            }
        },
    })
}

main().catch(console.error);
