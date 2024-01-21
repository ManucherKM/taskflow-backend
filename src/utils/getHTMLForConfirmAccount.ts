export function getHTMLForConfirmAccount(activationLink: string) {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Please activate your account</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(36, 37, 38);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: center;">
                    <div style="padding-bottom: 20px;"><img src="https://avatars.githubusercontent.com/u/91463158?v=4" alt="Cloud-storage"
                        style="width: 56px;"></div>
                  </div>
                  <div style="padding: 20px; background-color: rgb(47, 48, 49); border-radius: 12px;">
                    <div style="color: rgb(235, 237, 240); text-align: left;">
                      <h1 style="margin: 1rem 0; color: #BC98EA;">Final step...</h1>
                      <p style="padding-bottom: 16px">Follow this link to verify your email address.</p>
                      <p style="padding-bottom: 16px"><a href="${activationLink}" target="_blank"
                          style="padding: 12px 24px; border-radius: 4px; color: #000; background: #BC98EA;display: inline-block;margin: 0.5rem 0; text-decoration: none;">Confirm
                          now</a></p>
                      <p style="padding-bottom: 16px">If you didn’t ask to verify this address, you can ignore this email.</p>
                      <p style="padding-bottom: 16px">Best regards, Cloud-storage team.</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(115, 115, 115); text-align: center;">
                    <p style="padding-bottom: 16px">Made with Cloud-storage</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`
}
