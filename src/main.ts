#!/usr/bin/env node
// import yargs argument parser
import {argsValidation} from './args'
import {createTest} from './files'

async function main(argv: string[]) {
    // Parse arguments
    const {action, src, dest} = argsValidation(argv)
    if (action === 'test') {
        await createTest(src, dest)
    }
}

main(process.argv).catch(console.error)
