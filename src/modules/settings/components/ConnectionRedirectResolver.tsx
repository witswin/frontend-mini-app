import { axiosClient } from "@/configs/axios"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"

const resolveIntegrationApi = async (
  integrationName: string,
  params: { [key: string]: string | string[] }
) => {
  if (integrationName === "twitter") {
    const oAuthToken = params.oauth_token
    const oAuthVerifier = params.oauth_verifier

    await axiosClient.get(`/auth/twitter/callback/`, {
      params: {
        oauth_token: oAuthToken,
        oauth_verifier: oAuthVerifier,
      },
    })
    return "twitter"
  } else if (integrationName === "discord") {
  }
}

export const ConenctionRerdirectResolver: FC<{
  integrationName: string
}> = ({ integrationName }) => {
  const router = useRouter()

  useEffect(() => {
    resolveIntegrationApi(integrationName, router.query)
      .then((res) => {
        router.push(`/?callback=${res}`)
      })
      .catch(() => router.push("/"))
  }, [router, integrationName])

  return (
    <div className="text-center text-xl text-white">
      <h3>Please wait</h3>
      <p>We will redirect you shortly</p>
    </div>
  )
}
