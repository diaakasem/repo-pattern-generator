import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// Args Return Type
interface ArgsType {
    action: string
    src: string
    dest?: string
    help?: boolean
}

/**
 * Validates and parses command line arguments.
 *
 * @param argv - The command line arguments.
 * @returns An object containing the parsed arguments.
 */
export function argsValidation(argv: string[]): ArgsType {
    const args: ArgsType = {
        action: '',
        src: '',
        dest: '',
        help: false
    };

    yargs(hideBin(argv))
        .command('test', 'Perform an action', (yargs) => {
            yargs.option('src', {
                alias: 's',
                default: '',
                type: 'string',
                describe: 'Source file'
            })

            yargs.option('dest', {
                alias: 'd',
                default: '',
                type: 'string',
                describe: 'Destination file'
            })
        }, (argv) => {
            args.action = 'test'
            args.src = argv.src as string
            args.dest = argv.dest as string
        })
        .command('generate', 'Generate a file', (yargs) => {
            yargs.option('src', {
                alias: 's',
                type: 'string',
                describe: 'Source file'
            })

            yargs.option('dest', {
                alias: 'd',
                type: 'string',
                describe: 'Destination file'
            })
        }, (argv) => {
            args.action = 'generate'
            args.src = argv.src as string
            args.dest = argv.dest as string
        })
        .parse()
    return args;
}
