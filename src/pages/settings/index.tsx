import { ProfileProvider } from "@/modules/settings/context"
import { SettingsPage } from "@/modules/settings/page"

const SettingsIndex = () => {
  return (
    <ProfileProvider>
      <SettingsPage />
    </ProfileProvider>
  )
}

export default SettingsIndex
