import styles from './App.module.scss';
import { Outlet, Route, Routes } from 'react-router-dom';
import useUserInfo from './hooks/useUserInfo';
import Button from './components/Button';

function App() {
  const userInfo = useUserInfo();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Routes>
          <Route
            path="/"
            element={
              <Button icon="ne-upload" to="/upload">
                上传
              </Button>
            }
          />
          <Route path="/upload" element={<Button icon="ne-back" to="/" />} />
        </Routes>
        <div className={styles.userInfo}>
          <div className={styles.nickname}>{userInfo?.profile?.nickname}</div>
          <img className={styles.avatar} src={userInfo?.profile?.avatarUrl} alt="avatar" />
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
