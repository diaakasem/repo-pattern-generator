#!/usr/bin/env node
// import yargs argument parser
import yargs from 'yargs'
import {argsValidation} from './args'
import {createTest} from './files'

async function main(argv: string[]) {
    // Parse arguments
    const args: any = yargs(argv.slice(2)).argv
    argsValidation(args)
    const {action, src} = args
    if (action === 'test') {
        await createTest(src, args.dest)
    }
    console.log(`Action: ${action}`)
}

main(process.argv).catch(console.error)
