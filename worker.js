const { start } = require('@nexrender/worker')
const main = async () => {
    const serverHost = 'http://localhost:3000'
    const serverSecret = process.argv[3]
    process.env['NEXRENDER_FFMPEG'] = '/usr/local/bin/ffmpeg'
    await start(serverHost, serverSecret, {
        workpath: 'C:/Users/Administrator/Documents/Nexrender/.nexrender',
        binary: 'C:/Program Files/Adobe/Adobe After Effects 2022/Support Files/aerender',
        skipCleanup: true,
        addLicense: false,
        debug: true,
	stopOnError: false,
        actions: {
        },
    })
}

main().catch(console.error);
