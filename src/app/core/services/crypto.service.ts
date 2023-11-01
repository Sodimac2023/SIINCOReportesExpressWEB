import { Injectable } from '@angular/core';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private xmlParams =
    '<RSAKeyValue><Modulus>1ZDW1nzPa5Y5kZcJDSRaNnKS4tSfs8Xxf7aipGv59GVBsSgPO21rzSVgUDqQSMfYBrYvuafB2tIx8mtlruJOrOiV+Wn7EIO6+NA2xedsXVcGeNkE/JTMX6DrPAxAtYeyNv7TPb7DiFKVoZmS4Ngjinyi4osjUcuvFTJ+n4YV3uk=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>';
  private rsa =
    new window.System.Security.Cryptography.RSACryptoServiceProvider();

  constructor() {
    this.rsa.FromXmlString(this.xmlParams);
    this.rsa.BlockSize = 2048;
  }

  /**
   *
   * @param text
   * @returns
   */
  public encryptData(text: any) {
    let decryptedBytes = window.System.Text.Encoding.UTF8.GetBytes(text);
    let doOaepPadding = true;
    let encryptedBytes = this.rsa.Encrypt(decryptedBytes, doOaepPadding);
    let encryptedString = window.System.Convert.ToBase64String(encryptedBytes);
    return encryptedString;
  }
}
