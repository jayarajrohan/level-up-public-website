<template>
  <div>
    <div class="columns">
      <div class="column is-one-quarter chat-wrapper">
        <div
          v-for="room in rooms"
          :key="room.tutorUsername"
          @click="
            () => {
              onTutorSelect(room.tutorUsername);
            }
          "
          class="hover-style chat"
        >
          {{ room.tutorName }}
        </div>
      </div>
      <div class="column">
        <div class="message-area" ref="messageContainer">
          <div
            v-for="(messageItem, index) in messages"
            :key="index"
            :class="
              messageItem.senderUsername === username
                ? `current-user`
                : `not-current-user`
            "
          >
            <div
              :class="`message-item ${
                messageItem.senderUsername === username
                  ? `current-user-message-item`
                  : `not-current-user-message-item`
              }`"
            >
              {{ messageItem.message }}
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column mb-2">
            <b-input
              placeholder="Enter your message"
              expanded
              v-model="message"
              rounded
              @keydown.native="onMessageEnter"
            />
          </div>
          <div class="column is-narrow mx-2 mb-2">
            <b-button rounded @click="sendMessage">Send</b-button>
          </div>
        </div>
      </div>
    </div>
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader/appLoader.vue";
import { apiRequestManager } from "@/util/util";
import { io } from "socket.io-client";

export default {
  name: "StudentChats",
  data() {
    return {
      socket: null,
      isLoading: false,
      messageFromAllRooms: [],
      messages: [],
      selectedTutorUsername: "",
      rooms: [],
      message: "",
      username: "",
    };
  },
  components: {
    AppLoader,
  },
  created() {
    this.socket = io("https://level-up-pmy6.onrender.com");
    this.socket.on("receiveMessage", this.handleIncomingMessage);
    this.socket.on("loadOldMessages", this.handleOldMessages);
  },
  methods: {
    joinRoom(username) {
      this.socket.emit("joinRoom", username);
    },
    sendMessage() {
      this.socket.emit("sendMessage", {
        senderUsername: this.username,
        receiverUsername: this.selectedTutorUsername,
        message: this.message,
      });
    },
    handleIncomingMessage({
      senderUsername,
      receiverUsername,
      messageId,
      createdAt,
      message,
    }) {
      console.log(
        senderUsername,
        receiverUsername,
        messageId,
        createdAt,
        message
      );
      if (senderUsername === this.username) {
        this.message = "";
      } else {
        const audio = new Audio(require("@/assets/audio/chat.mp3"));
        audio.play();
      }

      const isFound = this.messageFromAllRooms.find(
        (room) =>
          room.tutorUsername === receiverUsername ||
          room.tutorUsername === senderUsername
      );

      if (isFound) {
        isFound.messages.push({ senderUsername, message });
        this.messages = isFound.messages;
        this.$nextTick(() => {
          const container = this.$refs.messageContainer;
          container.scrollTop = container.scrollHeight;
        });
        return;
      }

      this.messageFromAllRooms.push({
        tutorUsername:
          this.username === receiverUsername
            ? senderUsername
            : receiverUsername,
        messages: [{ senderUsername, message }],
      });

      this.messages = [{ senderUsername, message }];
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    handleOldMessages(messages) {
      this.messageFromAllRooms = [];
      messages.forEach((message) => {
        const isFound = this.messageFromAllRooms.find(
          (ar) =>
            ar.tutorUsername === message.senderUsername ||
            ar.tutorUsername === message.receiverUsername
        );

        if (isFound) {
          isFound.messages.push({
            senderUsername: message.senderUsername,
            message: message.message,
          });
        } else {
          this.messageFromAllRooms.push({
            tutorUsername:
              message.senderUsername === this.username
                ? message.receiverUsername
                : message.senderUsername,
            messages: [
              {
                senderUsername: message.senderUsername,
                message: message.message,
              },
            ],
          });
        }
      });
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    fetchConnectedTutors() {
      const comp = this;
      comp.isLoading = true;
      apiRequestManager("get", "/student/connected-tutors", {}, {}, (res) => {
        comp.isLoading = false;
        if (res.status === 200) {
          this.rooms = [];
          res.data.connectedTutors.forEach((connectedTutor) => {
            this.rooms.push({
              tutorName: connectedTutor.username,
              tutorUsername: connectedTutor.username,
            });
          });
          return;
        }
      });
    },
    onTutorSelect(tutorUsername) {
      this.selectedTutorUsername = tutorUsername;
      this.messages =
        this.messageFromAllRooms.find(
          (rooms) => rooms.tutorUsername === tutorUsername
        )?.messages || [];
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    onMessageEnter(e) {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    },
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.joinRoom(this.username);
    this.fetchConnectedTutors();
  },
  watch: {
    $route: "fetchConnectedTutors",
  },
};
</script>

<style scoped>
.message-area {
  height: calc(100vh - 115px);
  padding: 20px !important;
  overflow-y: auto;
}
.chat-wrapper {
  padding: 10px 0 !important;
}
.chat {
  background-color: #071f5d;
  color: #fff;
  padding: 10px;
  text-align: center;
}
.message-item {
  padding: 10px 20px;
  margin: 2px 0;
  color: #fff;
  max-width: 400px;
  border-radius: 30px;
}
.current-user-message-item {
  background-color: #071f5d;
}
.not-current-user-message-item {
  background-color: #006fb7;
}
.current-user {
  display: flex;
  justify-content: flex-end;
}
.not-current-user {
  display: flex;
  justify-content: start;
}
</style>
