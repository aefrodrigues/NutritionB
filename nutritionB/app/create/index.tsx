import { 
    View, 
    Text,  
    StyleSheet, 
    Pressable, 
    ScrollView
   } from 'react-native'
  
  import { z } from 'zod'
  import { zodResolver } from '@hookform/resolvers/zod'
  import { useForm } from  'react-hook-form'
  import { colors } from '../../constants/colors'
  import { Header } from '@/components/header'
  import { Select } from '../../components/Input/select'
  import { useDataStore } from '../../store/data'
  import { router } from 'expo-router'
  
  const schema = z.object({
    sexo: z.string().min(1, { message: "O sexo é obrigatório"}),
    objetivo: z.string().min(1, { message: "O Objetivo é obrigatório"}),
    nivel: z.string().min(1, { message: "Selecione seu level"}),
  })
  
  type FormData = z.infer<typeof schema>
  
  export default function Create() {
  
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
      resolver: zodResolver(schema)
    })
  
    const setPageTwo = useDataStore(state => state.setPageTwo)
  
    const sexoOptions = [
      { label: "Masculino", value: "masculino" },
      { label: "Feminino", value: "feminino" },
    ]
  
    const nivelOptions = [
      { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
      { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
      { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
      { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
    ]
  
    const objetivoOptions = [
      { label: 'Emagrecer', value: 'emagrecer' },
      { label: 'Hipertrofia', value: 'Hipertrofia' },
      { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
      { label: 'Definição', value: 'Definição' },
    ]
  
  
    function handleCreate(data: FormData){
      setPageTwo({
        nivel: data.nivel,
        sexo: data.sexo,
        objetivo: data.objetivo
      })
  
      router.push("/nutrition")
    }
  
   return (
     <View style={styles.container}>
      <Header
        step='Passo 2'
        title='Finalizando dieta'
      />
  
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="sexo"
          placeholder="Selecione o seu sexo..."
          error={errors.sexo?.message}
          options={sexoOptions}
        />
  
        <Text style={styles.label}>Selecione nível de atividade física:</Text>
        <Select
          control={control}
          name="nivel"
          placeholder="Selecione o nível de atividade física"
          error={errors.nivel?.message}
          options={nivelOptions}
        />      
  
        <Text style={styles.label}>Selecione seu objetivo:</Text>
        <Select
          control={control}
          name="objetivo"
          placeholder="Selecione o nível de atividade física"
          error={errors.objetivo?.message}
          options={objetivoOptions}
        />  
  
        <Pressable 
          style={styles.button} 
          onPress={handleSubmit(handleCreate)}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>               
  
      </ScrollView>
  
     </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: colors.background
    },
    label:{
      fontSize: 16,
      color: colors.white,
      fontWeight: 'bold',
      marginBottom: 8, 
     },
     content:{
      paddingLeft: 16,
      paddingRight: 16,
     },
     button:{
      backgroundColor: colors.blue,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    buttonText:{
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold'
    }
  })