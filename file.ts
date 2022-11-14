import { read, write } from 'xlsx'

export const fileExtension = (f: File) => {
  const tokens = f.name.toString().split('.')
  const extension = tokens[tokens.length - 1]?.toLocaleLowerCase() || ''
  return extension
}

export const readableSize = (bytes: number, decimals: number = 2) => {
  const kb = bytes / 1024
  const mb = kb / 1024
  const rounded =
    Math.round(
      (kb < 256 ? kb : mb) * (Math.pow(10, decimals))) / (Math.pow(10, decimals)
    )
  return `${rounded} ${kb < 512 ? 'KB' : 'MB'}`
}

export const convertExcelToCsv = async (file: File) => {
  const fileData = new Uint8Array(await file.arrayBuffer())
  const workbook = read(fileData, { type: 'array' })
  const result = await write(workbook, {
    type: 'buffer',
    bookType: 'csv'
  })

  // Creates a new file
  const blob = new Blob([result], { type: 'application/octet-stream' })
  return new File(
    [blob],
    file.name + '.csv',
    { type: 'application/octet-stream' }
  )
}

