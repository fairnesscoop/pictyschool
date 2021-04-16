export interface IFileUpload {
    getEndPoint(filePath: string): Promise<string>;
}
