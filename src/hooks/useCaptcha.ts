import { useCallback } from 'react'

const RECAPTCHA_SERVER_KEY = '6LeeL5ApAAAAANZu1OtHPyoCIyb2tuNTo5o149ys'

export const useCaptcha = () => {

    const verifyCaptcha = useCallback(async (captchaRef: any) => {
        const token = captchaRef.current?.props.grecaptcha.getResponse()
        return await verifyCaptchaToken(token)

    }, [])

    return { 
        verifyCaptcha
    }
}

export async function verifyCaptchaToken(token: string): Promise<void> {
    console.log("token: ", token)

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'post',
        mode: 'no-cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            secret: RECAPTCHA_SERVER_KEY,
            response: token,
        }),
    })
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
    .then(json => (json.success))
    .catch(err => { throw new Error(`Error: ${err.message}`) })
  
    if(token == null || !response){
      throw new Error(`YOU ARE NOT A HUMAN.`)
    }
}
