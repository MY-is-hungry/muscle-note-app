import { useEvents } from "@common/hooks/reactQuery"

const EventList: React.FC = () => {
  const { data: data, isLoading: isEventLoading } = useEvents({})
  return (
    null
  )
}
export default EventList