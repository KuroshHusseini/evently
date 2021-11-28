// import React from "react";
// import { Card, Subheading, Caption } from "react-native-paper";
// import { View, StyleSheet, ImageBackground } from "react-native";
// import SkeletonContent from "react-native-skeleton-content";

// const LoadingSkeleton = () => {
//   return (
//     <SkeletonContent>
//       <Card style={styles.card}>
//         <ImageBackground
//           style={styles.cardCover}
//           source={{ uri: event?.image }}
//           resizeMode="cover"
//         >
//           <View style={styles.cardInsideContainer}>
//             <Card.Content>
//               <View style={styles.cardTitle}>
//                 <View style={styles.cardTitleWrapper}>
//                   <Subheading>{event?.title}</Subheading>
//                 </View>
//                 <View>
//                   <Subheading>{event?.startDateTime}</Subheading>
//                 </View>
//               </View>
//               <View>
//                 <Caption>{event?.details}</Caption>
//               </View>
//               <View style={styles.loWrapper}>
//                 <View>
//                   <Subheading>{event?.location}</Subheading>
//                 </View>
//                 <View>
//                   <Subheading>{event?.host}</Subheading>
//                 </View>
//               </View>
//             </Card.Content>
//           </View>
//         </ImageBackground>
//       </Card>
//     </SkeletonContent>
//   );
// };

// const styles = StyleSheet.create({
//   normalText: {
//     fontSize: 18,
//   },
//   bigText: {
//     fontWeight: "bold",
//     fontSize: 28,
//   },
// });

// export default LoadingSkeleton;
