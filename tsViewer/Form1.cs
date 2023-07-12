using AxWMPLib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.IO;
using System.Threading;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WMPLib;

namespace tsViewer
{
    public partial class Form1 : Form
    {
/*        private AxWMPLib.AxWindowsMediaPlayer axmainPlayer;
        private AxWMPLib.AxWindowsMediaPlayer axnextPlayer;*/
        private string[] videoFiles;
        private int currentIndex;

        public Form1()
        {
            InitializeComponent();

            // Hide the main player interface
            //axmainPlayer.uiMode = "none";

            // Set up the video files array
            videoFiles = new string[]
            {
            @"C:/harUploadServer/downloads/tsFiles/file5.ts",
            @"C:/harUploadServer/downloads/tsFiles/file6.ts",
            @"C:/harUploadServer/downloads/tsFiles/file7.ts"
            };

            // Start playing the first video
            PlayVideo(0);
        }

        private void PlayVideo(int index)
        {
            // Set the URL of the main player control to the current video file
            axmainPlayer.URL = videoFiles[index];

            // Load the next video in the background
            var nextIndex = (index + 1) % videoFiles.Length;
            LoadNextVideo(videoFiles[nextIndex]);

            // Play the current video
            axmainPlayer.Ctlcontrols.play();

            // Set the current index to the next video
            currentIndex = nextIndex;
        }

        private void LoadNextVideo(string path)
        {
            // Create a new instance of the Windows Media Player control
            var player = new AxWMPLib.AxWindowsMediaPlayer();
            player.BeginInit();
            player.Dock = DockStyle.Fill;
            //player.uiMode = "none";
            this.Controls.Add(player);
            player.EndInit();

            // Set the URL of the player control to the next video file and load it into memory
            player.URL = path;
            player.settings.autoStart = false;
            player.settings.volume = 0;

            // Store a reference to the player control
            axnextPlayer = player;
        }

        private void MainPlayer_PlayStateChange(object sender, AxWMPLib._WMPOCXEvents_PlayStateChangeEvent e)
        {
            // Check if the current video has ended
            if (axmainPlayer.playState == WMPLib.WMPPlayState.wmppsMediaEnded)
            {
                // Swap the next player control with the main player control
                var tempPlayer = axmainPlayer;
                axmainPlayer = axnextPlayer;
                axnextPlayer = null;

                // Start playing the next video
                PlayVideo(currentIndex);
            }
        }
    }
}
