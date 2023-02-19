import { PlusIcon } from '@heroicons/react/24/solid'

type Props = {
  onClick: () => void
}

const ButtonReadMore = ({ onClick }: Props) => {
  return (
    <button
      className="flex w-fit items-center rounded-full border border-gray-500 p-2 px-4 text-gray-400"
      onClick={onClick}
    >
      <PlusIcon className="h-6 w-6 text-white" />
      <span className="ml-3">Read More</span>
    </button>
  )
}

export default ButtonReadMore
