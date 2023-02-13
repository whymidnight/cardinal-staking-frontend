import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { InformationCircleIcon as InformationCircleIconSolid } from '@heroicons/react/24/solid'

type InfoTipProps = {
  screen: any
  activeScreen: any
  setActiveScreen: (screen: any) => void
}

export const InfoTipButtons = ({
  screen,
  activeScreen,
  setActiveScreen,
}: InfoTipProps) => {
  {
    return screen === activeScreen ? (
      <InformationCircleIconSolid className="ml-1 h-6 w-6 cursor-pointer rounded-full border border-orange-500 text-orange-500" />
    ) : (
      <InformationCircleIcon
        className="ml-1 h-6 w-6 cursor-pointer text-gray-400"
        onClick={() => setActiveScreen(screen)}
      />
    )
  }
}

