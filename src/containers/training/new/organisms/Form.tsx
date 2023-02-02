import { useCreateRecord } from "@common/hooks/api/useRecord";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "@common/styles/themes";
import { ExerciseType } from "@common/types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, IconButton, TextInput } from 'react-native-paper';
import { useTailwind } from "tailwind-rn/dist";

const Form: React.FC<Props> = ({exercise, navigation, date}) => {
  const tailwind = useTailwind()
  const queryClient = useQueryClient()
  const defaultSetCount = 3
  const emptyValue = { weight: '', rep: '', note: { content: '' } }
  const defaultValues: TrainingFormType[] = [...Array(defaultSetCount)].map(_=>(emptyValue))
  const [fields, setFields] = useState(defaultValues)
  const createRecord = useCreateRecord()

  const addField = () => setFields(fields=>([...fields, emptyValue]))
  const removeField = (index:number) => setFields(fields=>(fields.filter((v,i)=>i!==index)))

  const changeFieldWeight = (index:number,weight: string) => setFields(fields=>{
    return fields.map((field, i)=> i === index ? { ...field, weight: weight } : field)
  })
  const changeFieldRep = (index:number,rep:string) => setFields(fields=>{
    return fields.map((field, i)=> i === index ? { ...field, rep: rep } : field)
  })

  const saveRecord = () => {
    createRecord.mutate({records: fields, exerciseId: exercise.id, date: date}, {
      onSuccess: () => {
        // TODO: おそらくキャッシュを更新するリクエストが違う要確認
        queryClient.invalidateQueries(['records', 'daily'])
        navigation.navigate('TrainingIndex', { date: date })
      },
    })
  }

  return (
    <>
      <View style={tailwind('w-80 p-6 mb-8 rounded-3xl bg-transp-gray')}>
        <Text style={tailwind('mb-2 text-white text-lg')}>{exercise.name}</Text>
        <View style={tailwind('w-full')}>
          {fields.map((row,i) => (
            <View key={`field${i}`} style={tailwind('flex flex-row items-center mb-1')}>
              <Text style={tailwind('text-white text-lg')}>
                {i+1}.
              </Text>
              {[row.weight, row.rep].map((value, v_i)=> {
                return (
                  <>
                    <View style={tailwind('flex flex-row items-center mr-3 ml-3')}>
                      <TextInput
                        keyboardType='numeric'
                        value={value}
                        onChangeText={(text)=>{v_i == 0 ? changeFieldWeight(i,text) : changeFieldRep(i,text)}}
                        style={tailwind('w-14 h-10 text-center bg-transparent text-lg mr-2')}
                      />
                      <Text style={tailwind('text-white text-lg')}>
                        { v_i == 0 ? 'kg' : 'rep'}
                      </Text>
                    </View>
                    { v_i == 0 && <Text style={tailwind('text-white text-lg')}>×</Text> }
                  </>
                )
              })}
              <IconButton
                icon='close-circle-outline'
                color={SECONDARY_COLOR}
                size={25}
                onPress={()=>removeField(i)}
              />
            </View>
          ))}
          <IconButton
            icon='plus-circle'
            color={PRIMARY_COLOR}
            size={40}
            onPress={addField}
            // style={tailwind('mb-5')}
          />
        </View>
      </View>
      <Button
        mode='contained'
        onPress={saveRecord}
        contentStyle={tailwind('w-full h-full')}
        labelStyle={tailwind('text-base')}
        style={tailwind('w-64 h-16 mx-auto mt-6 bg-primary rounded-lg')}
      >
        <Text>保存する</Text>
      </Button>
    </>
  )
}

type Props = {
  navigation: any
  exercise: ExerciseType
  date: string
}

type TrainingFormType = {
  weight?: string
  rep?: string
  note: {
    content?: string
  }
}

export default Form