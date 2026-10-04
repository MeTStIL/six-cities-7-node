import { IFileReader } from './file-reader.interface';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

const CHUNK_SIZE = 16384; // 16KB

export interface TsvFileReader {
  on(eventName: 'line', listener: (line: string) => void): this;
  on(eventName: 'end', listener: (parsedLineCount: number) => void): this;

  emit(eventName: 'line', line: string): boolean;
  emit(eventName: 'end', parsedLineCount: number): boolean;
}

export class TsvFileReader extends EventEmitter implements IFileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    try {
      const readStream = createReadStream(this.filename, {
        highWaterMark: CHUNK_SIZE,
        encoding: 'utf-8',
      });

      let remainingData = '';
      let nextLinePosition = -1;
      let importedRowCount = 0;

      for await (const chunk of readStream) {
        remainingData += chunk.toString();

        while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
          const completeRow = remainingData.slice(0, nextLinePosition + 1);
          remainingData = remainingData.slice(++nextLinePosition);
          importedRowCount++;

          this.emit('line', completeRow);
        }
      }

      this.emit('end', importedRowCount);
    } catch {
      throw new Error(`Can't import data from file: ${this.filename}`);
    }
  }
}
