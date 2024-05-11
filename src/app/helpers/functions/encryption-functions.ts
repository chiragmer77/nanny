import { cipher, util } from 'node-forge';
import { environment } from '@env/environment';
export class EncryptionFunctions {

  public static ENCRYPT_OBJ(value: any): any {
    let result = '';
    try {
      result = util.encode64(util.encodeUtf8(JSON.stringify(value)));
    } catch (e) {
    }
    return result;
  }

  public static DECRYPT_OBJ(value: any, key: string = ''): any {
    if (value) {
      let result = '';
      try {
        result = JSON.parse(util.decodeUtf8(util.decode64(value.toString())));
      } catch (e) {
        localStorage.setItem(key, '');
      }
      return result;
    }
    return '';
  }

  public static encrypt_cipher(value: any) {
    let result = '';
    try {
      var create_cipher = cipher.createCipher('AES-CBC', environment.encryption.key);
      create_cipher.start({ iv: environment.encryption.iv });
      create_cipher.update(util.createBuffer(value, 'utf8'));
      create_cipher.finish();

      result = util.encode64(create_cipher.output.getBytes())
    } catch (error) {

    }
    return result;
  }

  public static decrypt_cipher(value: any) {
    let result = '';
    try {
      var decipher = cipher.createDecipher('AES-CBC', environment.encryption.key);
      decipher.start({ iv: environment.encryption.iv });
      decipher.update(new util.ByteStringBuffer(util.decode64(value)));
      decipher.finish();
      result = decipher.output.toString()
    } catch (error) {

    }
    return result
  }

}

