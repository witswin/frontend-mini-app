import dynamic from "next/dynamic"

const ConnectionRedirectResolver = dynamic(
  () =>
    import("@/modules/settings/components/ConnectionRedirectResolver").then(
      (res) => res.ConenctionRerdirectResolver
    ),
  { ssr: false }
)

export default function TwitterRedirect() {
  return <ConnectionRedirectResolver integrationName="discord" />
}
