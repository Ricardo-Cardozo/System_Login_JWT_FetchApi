import { useState, useCallback, useEffect, useRef } from 'react'

export const useFetch = () => {
	const [error,setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

	const activeHttpRequests = useRef([])
	
	const sendRequest = useCallback(async (url, method = 'GET', headers = {}, body = null ) => {
		setIsLoading(true)

		const httpAbortCtrl = new AbortController()

		activeHttpRequests.current.push(httpAbortCtrl)
		
		try {
			const response = await fetch(url, {
				method,
				headers,
				body,
				signal: httpAbortCtrl.signal
			})
			
			const responseData = await response.json()

			activeHttpRequests.current = activeHttpRequests.current.filter(
				reqCtrl => reqCtrl !== httpAbortCtrl
			)

			if (!response.ok) {
				throw new Error(responseData.message)
			}

			setIsLoading(false)

      return responseData
		
		} catch (err) {
			setIsLoading(false)
			setError(err.message)
			setTimeout(() => {
				setError('')
			}, 1300);
			throw err
		}

	}, [])

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
		}
	}, [])
	

	return { error, sendRequest, isLoading }

}