namespace tsViewer
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.axmainPlayer = new AxWMPLib.AxWindowsMediaPlayer();
            this.axnextPlayer = new AxWMPLib.AxWindowsMediaPlayer();
            ((System.ComponentModel.ISupportInitialize)(this.axmainPlayer)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.axnextPlayer)).BeginInit();
            this.SuspendLayout();
            // 
            // axmainPlayer
            // 
            this.axmainPlayer.Enabled = true;
            this.axmainPlayer.Location = new System.Drawing.Point(12, 12);
            this.axmainPlayer.Name = "axmainPlayer";
            this.axmainPlayer.OcxState = ((System.Windows.Forms.AxHost.State)(resources.GetObject("axmainPlayer.OcxState")));
            this.axmainPlayer.Size = new System.Drawing.Size(896, 367);
            this.axmainPlayer.TabIndex = 0;
            this.axmainPlayer.PlayStateChange += new AxWMPLib._WMPOCXEvents_PlayStateChangeEventHandler(this.MainPlayer_PlayStateChange);
            // 
            // axnextPlayer
            // 
            this.axnextPlayer.Enabled = true;
            this.axnextPlayer.Location = new System.Drawing.Point(1290, 12);
            this.axnextPlayer.Name = "axnextPlayer";
            this.axnextPlayer.OcxState = ((System.Windows.Forms.AxHost.State)(resources.GetObject("axnextPlayer.OcxState")));
            this.axnextPlayer.Size = new System.Drawing.Size(678, 367);
            this.axnextPlayer.TabIndex = 1;
            // 
            // Form1
            // 
            this.ClientSize = new System.Drawing.Size(2081, 570);
            this.Controls.Add(this.axnextPlayer);
            this.Controls.Add(this.axmainPlayer);
            this.Name = "Form1";
            ((System.ComponentModel.ISupportInitialize)(this.axmainPlayer)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.axnextPlayer)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private AxWMPLib.AxWindowsMediaPlayer axWindowsMediaPlayer1;
        private System.Windows.Forms.Button button1;
        private AxWMPLib.AxWindowsMediaPlayer axmainPlayer;
        private AxWMPLib.AxWindowsMediaPlayer axnextPlayer;
    }
}

