import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const ButtonBox: React.FC<Props> = ({name, value}) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex w-38 h-30 py-4 px-4 my-2 rounded-2xl bg-transp-gray')}>
      <View style={tailwind('flex-row justify-between')}>
        <Text style={tailwind('text-white text-lg')}>
          {name}
        </Text>
        <Text style={tailwind('text-white text-lg')}>{'>'}</Text>
      </View>
      { typeof value === 'string' ?
        <View style={tailwind('ml-auto')}>
          <Text style={tailwind('text-white text-lg')}>{value}</Text>
        </View>
        :
        <>
          <Text style={tailwind('text-white text-lg')}>{value.goal}</Text>
          <Text style={tailwind('text-white text-lg')}>{value.current}</Text>
        </>
      }
    </View>
  )
}

type Props = { 
  name: string
  value: string | { goal: string, current: string }
}

export default ButtonBox