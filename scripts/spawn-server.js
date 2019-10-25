const { exec } = require('child_process'),
{ resolve } = require('path')

const programs = [{
    name:'PARCEL',
    cmd: 'node', 
    args: [resolve('.','scripts','pre-test')]
},{
    name:'CYPRESS',
    cmd:'npx',
    args: ['cypress','open']
},{
    name: 'SERVER',
    cmd: 'node',
    args:['./test/e2e/server']
}]

for (let program of programs){
    
    console.log(`execing program: ${program.name}`)

    let p = exec(`${program.cmd} ${program.args.join(' ')}`,(err, stdout,stderr) => {

        if (err) console.error(`\u001b[30;1m${err}\u001b[0m`)
        if(stdout) console.log(`\u001b[32;1m[${program.name}]: ${Buffer.from(stdout).toString()}\u001b[0m`)
        if (stderr) console.error(`\u001b[30;1m${stderr}\u001b[0m`)
    })

    p.on('close', () => process.exit(0))

}