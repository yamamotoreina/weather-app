import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import React, { JSX, useState } from "react"
import { Ionicons } from "@expo/vector-icons"

type Props = {
  onSearch: (city:string)=> void //HomeScreen(親コンポーネント)から渡される
}

 export const SearchBar = ({onSearch}:Props)=> {
  const [query, setQuery] = useState("")

  const handlePress = () => {
    if (query.trim()!==""){
      onSearch(query.trim())//APIは親側
      setQuery("")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
       style={styles.input}
       value={query}
       onChangeText={setQuery}
        placeholder="search"
        placeholderTextColor="#D8D8D8"
        onSubmitEditing={handlePress}
      />
      <TouchableOpacity onPress={handlePress}>
        <Ionicons name="search" size={20} color="#333" style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    marginVertical: 32,
    borderRadius: 20,
    width: "80%",
    backgroundColor:"#fff"
  },
  input:{
    flex: 1,
    fontSize: 20,
    paddingLeft:16,
    borderBottomEndRadius: "1px"
  },
  icon: {
    paddingRight:16,
  }
})
