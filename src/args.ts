
function usage() {
    console.log('Usage: main.ts --action <action> --src <file> [--dest <file>]');
}

export function argsValidation(args: any) {
    if (args.help) {
        usage();
        process.exit(0);
    }
    if (!args.action) {
        console.error('Action is required');
        usage();
        process.exit(1);
    }
    if (!args.src) {
        console.error('Source file is required');
        usage();
        process.exit(1);
    }
}

