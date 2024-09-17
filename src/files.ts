// import { promisify } from 'util';
import { promises as fs } from 'fs'
import { mkdirp } from 'mkdirp'
import { render } from 'mustache'

export async function isFileExist(src: string) {
    const expanded = src.replace(/^~/, process.env.HOME || '')
    const absolute = expanded.startsWith('/') ? expanded : `${process.cwd()}/${expanded}`
    try {
        await fs.access(absolute, fs.constants.F_OK)
        return true
    } catch (err) {
        // console.error(err)
        // console.error(`File ${absolute} does not exist`)
        return false
    }
}

export async function createTest(src: string, dest: string = '') {
    const expanded = src.replace(/^~/, process.env.HOME || '')
    const absolute = expanded.startsWith('/') ? expanded : `${process.cwd()}/${expanded}`
    // if (!await isFileExist(expanded)) {
    //     process.exit(1)
    // }

    if (dest === '') {
        dest = absolute.replace(/\/soci\/soci-dev\/soci\//, '/soci/soci-dev/soci/spec/unit/').replace(/\.php$/, 'Test.php')
    }
    const destParent = dest.replace(/\/[^/]+$/, '')
    await mkdirp(destParent)

    if (!await isFileExist(dest)) {
        const template = await fs.readFile(__dirname + '/templates/PHPTest.tmpl', { encoding: 'utf-8' })
        const className = absolute.replace(/.*\//, '').replace(/\.php$/, '')
        const lastParentDir = absolute.split('/').slice(-2, -1)[0]
        const rendered = render(template, { className, namespace: lastParentDir })
        await fs.writeFile(dest, rendered, { encoding: 'utf-8' })
    // } else {
        // console.info(`Test file already exists: ${dest}`)
    }
}
