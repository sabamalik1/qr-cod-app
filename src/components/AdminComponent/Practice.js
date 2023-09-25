import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
// } from '@ant-design/icons';

// const App = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className={`bg-gray-800 text-white w-64 min-h-screen transition-all duration-300 ease-in-out ${
//           collapsed ? 'transform translate-x-[-100%]' : ''
//         }`}
//       >
//         <div className="p-4">
//           <div className="text-2xl font-bold">Demo Logo</div>
//         </div>
//         <ul className="py-4">
//           <li className="mb-2">
//             <a
//               href="#"
//               className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-600"
//             >
//               <UserOutlined className="mr-2" />
//               <span>Nav 1</span>
//             </a>
//           </li>
//           <li className="mb-2">
//             <a
//               href="#"
//               className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-600"
//             >
//               <VideoCameraOutlined className="mr-2" />
//               <span>Nav 2</span>
//             </a>
//           </li>
//           <li className="mb-2">
//             <a
//               href="#"
//               className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-600"
//             >
//               <UploadOutlined className="mr-2" />
//               <span>Nav 3</span>
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Content */}
//       <div className="flex-1">
//         <header className="bg-gray-200 p-4">
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="text-xl"
//           >
//             {collapsed ? (
//               <MenuUnfoldOutlined />
//             ) : (
//               <MenuFoldOutlined />
//             )}
//           </button>
//         </header>
//         <main className="p-6 bg-gray-100 min-h-screen">
//           Content
//         </main>
//       </div>
//     </div>
//   );
// };

// export default App;



import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, Button, theme } from 'antd';
  const { Header, Sider, Content } = Layout;
  const Practice = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default Practice;