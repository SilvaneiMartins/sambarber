import IStoranteProvider from '../models/IStorageProvider'

class FakeStorageProvider implements IStoranteProvider {
   private storage: string[] = []

   // Função que salva um arquivo
   public async saveFile(file: string): Promise<string> {
      this.storage.push(file)
      return file
   }

   // Função que deleta um arquivo
   public async deleteFile(file: string): Promise<void> {
      const fileIndex = this.storage.findIndex(
         storageFile => storageFile === file
      )
      this.storage.splice(fileIndex, 1)
   }
}

export default FakeStorageProvider
