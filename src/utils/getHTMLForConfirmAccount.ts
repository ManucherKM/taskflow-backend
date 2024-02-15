export function getHTMLForConfirmAccount(activationLink: string) {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Please activate your account</title><!--[if mso]><style type="text/css">body,table,td,a{font-family:Arial,Helvetica,sans-serif!important}</style><![endif]--></head><body style="font-family:Helvetica,Arial,sans-serif;margin:0;padding:0;background-color:#09090b"><table role="presentation"style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-family:Arial,Helvetica,sans-serif;background-color:#09090b"><tbody><tr><td align="center" style="padding:1rem 2rem;vertical-align:top;width:100%"><table role="presentation"style="max-width:600px;border-collapse:collapse;border:0;border-spacing:0;text-align:left"><tbody><tr><td style="padding:40px 0 0"><div style="text-align:center"><div style="padding-bottom:20px"><img src="https://raw.githubusercontent.com/ManucherKM/taskflow-frontend/2960b6d64c065f83aaeb02cbb237f19502ce4944/public/logo-wite.svg" width="104px" height="20px" alt="TaskFlow logo"></div></div><div style="padding:20px;border-radius:12px;border:1px solid #27272a;"><div style="color:#a1a1aa;text-align:left"><h1 style="margin:1rem 0;color:#fafafa">Final step...</h1><p style="padding-bottom:16px">Follow this link to verify your emailaddress.</p><p style="padding-bottom:16px"><a href="${activationLink}" target="_blank"style="padding:12px 24px;border-radius:4px;color:#000;background:#fafafa;display:inline-block;margin:.5rem 0;text-decoration:none">Confirmnow</a></p><p style="padding-bottom:16px">If you didn’t ask to verify this address, youcan ignore this email.</p><p style="padding-bottom:16px">Best regards, TaskFlow team.</p></div></div><div style="padding-top:20px;color:#737373;text-align:center"><p style="padding-bottom:16px">Made with TaskFlow</p></div></td></tr></tbody></table></td></tr></tbody></table></body></html>`
}
