/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare namespace IncoreString {
    const incrementLetter: (letter: string) => string;
    const trim: (content: string, charlist?: string) => string;
    const rtrim: (content: string, charlist?: string) => string;
    const ltrim: (content: string, charlist?: string) => string;
    const crop: (content: string, limit: number, ignoreWordsLength?: number, maxChars?: number) => string;
    const isEmpty: (content: string) => boolean;
    const toSingleByte: (content: string) => string;
}
